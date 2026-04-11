pipeline {
    agent any

    environment {
        IMAGE_NAME = "iot-dashboard"
        TAG = "v${env.BUILD_NUMBER}"
    }

    stages {

        stage('Clone Source') {
            steps {
                git branch: 'main', url: 'https://github.com/yjn002/iot-dashboard.git'
            }
        }

        stage('Install & Build React') {
            steps {
                bat """
                echo Checking Node...
                node -v
                npm -v

                echo Installing dependencies...
                npm install --legacy-peer-deps

                echo Building React app...
                npm run build
                """
            }
        }

        stage('Docker Build') {
            steps {
                bat """
                docker build -t %IMAGE_NAME%:%TAG% .
                docker tag %IMAGE_NAME%:%TAG% %IMAGE_NAME%:latest
                """
            }
        }

        stage('Deploy/Update') {
            steps {
                bat """
                @echo off
                echo Terminating stale containers...
                docker rm -f iot_instance 2>nul || ver >nul
                
                echo Deploying %IMAGE_NAME%:%TAG% to Port 8082...
                docker run -d -p 8082:80 --name iot_instance %IMAGE_NAME%:%TAG%
                """
            }
        }
    }

    post {
        success {
            echo "Deployment of version ${TAG} successful."
        }
        failure {
            echo "Critical failure in Pipeline. Inspect Docker logs."
        }
    }
}