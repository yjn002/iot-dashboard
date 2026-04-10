pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Build React App') {
            steps {
                echo 'Building the React production bundle...'
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Packaging the application into a Docker image...'
                // Using v${BUILD_NUMBER} to keep versions unique
                bat "docker build -t iot-dashboard:v${env.BUILD_NUMBER} ."
                bat "docker tag iot-dashboard:v${env.BUILD_NUMBER} iot-dashboard:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Minikube...'
                // Ensure the deployment.yaml exists in your root folder
                bat 'kubectl apply -f deployment.yaml'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Switching to "bat" solved the "sh" error, check logs for other issues.'
        }
    }
}