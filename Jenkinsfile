pipeline {
    agent any

    environment {
        IMAGE_NAME = "iot-dashboard"
        IMAGE_TAG = "v${env.BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "✅ Code checked out"
            }
        }

        stage('Install') {
            steps {
                bat 'npm install --legacy-peer-deps'
                echo "📦 Dependencies installed"
            }
        }

        stage('Build React') {
            steps {
                bat 'npm run build'
                echo "🔨 React build complete"
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                bat "docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest"
                echo "🐳 Docker image built: %IMAGE_NAME%:%IMAGE_TAG%"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
                bat 'kubectl rollout restart deployment iot-dashboard'
                bat 'kubectl rollout status deployment iot-dashboard'
                echo "☸️ Deployment successful"
            }
        }
    }

    post {
        success {
            echo "🎉 Build #${env.BUILD_NUMBER} deployed successfully!"
        }
        failure {
            echo "❌ Build failed — check logs"
        }
        always {
            echo "📋 Pipeline finished: ${currentBuild.result}"
        }
    }
}