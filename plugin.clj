{:name "My New Plugin"
 :description "A description of my new plugin"
 :version "1.0.0"}
(ns metabase.plugins.my-new-plugin
  (:require [metabase.subscriptions :as subscriptions]
            [metabase.sftp :as sftp]))

(ns my-new-plugin.subscriptions
  (:require [metabase-subscriptions.core :as subscriptions]
            [metabase-sftp.client :as sftp]))

(defsubscription sftp-export
  {:name "SFTP Export"
   :description "Exports data to an SFTP server"
   :options [{:key :hostname :display-name "Hostname" :type :string}
             {:key :username :display-name "Username" :type :string}
             {:key :password :display-name "Password" :type :password}
             {:key :directory :display-name "Directory" :type :string}]
   :subscribe (fn [subscription data]
               (let [client (sftp/connect {:hostname (:hostname subscription)
                                          :username (:username subscription)
                                          :password (:password subscription)})]
                 (sftp/create-directory client (:directory subscription))
                 (sftp/transfer-data client data (str (:directory subscription) "/data.csv"))
                 (sftp/disconnect client)))}
