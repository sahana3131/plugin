const jsch = require("jsch"); // import the jsch library
const jsftp = require("jsftp");
 
const Ftp = new jsftp({
    hostname: "example.com",
    port: 22,
    username: "user",
    password: "password",
    remotePath: "C:\Users\SAHANA\remotefolder"
});
// function to connect to SFTP server using provided hostname, port, username, and password
const connectToSftp = (hostname, port, username, password) => {
    const session = new jsch.Session(hostname, username, port);
    session.setPassword(password);
    session.connect();
    const sftp = session.openChannel("sftp");
    sftp.connect();
    return sftp;
}

// function to export data from Metabase to SFTP server
const exportDataToSftp = (queryId, remoteFolder) => {
    try {
        // retrieve data from specific dashboard or query
        const data = Metabase.Query.execute(queryId);
        // convert data to json format
        const jsonData = JSON.stringify(data);

        // connect to SFTP server
        const sftp = connectToSftp(hostname, port, username, password);

        // check if the remote folder exists
        sftp.ls(remoteFolder, (err, list) => {
            if (err) {
                // if the folder does not exist, create it
                sftp.mkdir(remoteFolder);
            }
        });

        // change the working directory to the remote folder
        sftp.cd(remoteFolder);

        // export data to the remote folder
        sftp.put(jsonData, "data.json");

        // close the SFTP channel and session
        sftp.disconnect();
        session.disconnect();
    } catch (error) {
        console.log("Error:",{error});
    }
}

// register plugin routes for config page
Metabase.registerPluginRoutes({
    "/plugins/sftp-export-plugin/config": function(params) {
        return {
            component: () => import("./config.html")
        };
    }
});