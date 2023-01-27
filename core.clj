(ns my-new-plugin.core
  (:require [metabase-subscriptions :as subscriptions]
            [metabase-sftp :as sftp]))
(ns my-new-plugin.core
  (:require [metabase-subscriptions :refer [subscribe-with-sftp]]
            [metabase-sftp :refer [connect]]))
