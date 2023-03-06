#!/usr/bin/env groovy
@Library('ggl-jenkins-sharedlibs') _

def yaml_slave = def_slave.nodejs16('1.0','2','4','3G','6G')

def bucketreport = "gl-toolchain-report-data-bucket-ox"

pipeline {
    agent {
        kubernetes {
            //name must be different from jenkins default or yaml value are not use
            label 'sharedlibs-nodejs16'
            yaml "${yaml_slave}"
        }
    }

    environment {
        NEXUS_EMAIL                  = "admin@nexus.com"
        NEXUS_PRIVATE_REPO_PATH      = "/repository/sapcc/lighthouse"
        NEXUS_CREDS                  = credentials('nexus-credential')
        GOOGLE_CREDENTIALS_TF        = credentials('gl-dsi-ecom-deploy-terraform-service-account')
    }

    stages {
        stage('Build') {
            steps {
                container('nodejs') {
                sh """
                    npm install
                """
                }
            }
        }
        stage('Run test') {
            steps {
                container('nodejs') {
                sh """
                    rm -rf reports/website*
                    xvfb-run --auto-servernum npm run inspect:${GIT_BRANCH}
                """
                }
            }
        }
        stage('Export Reports to Nexus') {
             steps {
                container('nodejs') {
                sh """
                    ls -l reports/
                    #curl -v -u ${env.NEXUS_CREDS_USR}:${env.NEXUS_CREDS_PSW} --upload-file *.json https://${env.NEXUS_URL}${env.NEXUS_PRIVATE_REPO_PATH}/json
                    #curl -v -u ${env.NEXUS_CREDS_USR}:${env.NEXUS_CREDS_PSW} --upload-file *.html https://${env.NEXUS_URL}${env.NEXUS_PRIVATE_REPO_PATH}/html
    
                """
                }
            }
        }
        
        stage('Export reports to GCS') {
            steps {
                container('nodejs') {
                sh """              
                  export GOOGLE_CREDENTIALS=${GOOGLE_CREDENTIALS_TF}
                  gcloud auth activate-service-account --key-file=${GOOGLE_CREDENTIALS_TF}
                  if [[ -d reports ]]; then
                    gsutil -m cp -r reports/*.html gs://${bucketreport}/light-house/$GIT_BRANCH/$BUILD_NUMBER/index.html
                  fi
                """
                }
            }
        }
        
        stage('Publish html reports') {
            steps {
                container('nodejs') {
                sh """              
                cat <<EOF > reports/lighthouse.html
                        <html xmlns="http://www.w3.org/1999/xhtml">
                            <head>
                                <title>Light House Report</title>
                                <!--meta http-equiv="refresh" content="0;URL='https://gcs-proxy.toolschain.ecom.gl.rocks/light-house/$GIT_BRANCH/$BUILD_NUMBER/index.html'" /-->
                            </head>
                            <body>
                            <p>Light House reports are available <a href="https://gcs-proxy.toolschain.ecom.gl.rocks/light-house/$GIT_BRANCH/$BUILD_NUMBER/index.html" target="_new">here</a>.</p>
                            </body>
                        </html>
EOF
                """

                publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: "reports/",
                        reportFiles: 'lighthouse.html',
                        reportName: 'Tests-Reports',
                        reportTitles: 'Load Test'
                ])
                }
            }
        }
    }
}