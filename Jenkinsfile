pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("your-registry.com/gaming-webpage:${env.BUILD_NUMBER}", "--no-cache .")
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --legacy-peer-deps'
            }
        }
        // Other stages
    }
    post {
        failure {
            cleanWs()
            sh 'docker system prune -f'
            echo 'Build failed. Check logs for details.'
        }
    }
}
