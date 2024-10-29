pipeline {
    agent any

    environment {
        IMAGE_NAME = "your-registry.com/gaming-webpage"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your SCM (GitHub repository in this case)
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using the current build number for tagging
                    docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}", "--no-cache .")
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies with npm, ignoring peer dependency warnings if needed
                    sh 'npm ci --legacy-peer-deps'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Optional: Run tests to ensure code quality
                sh 'npm run test'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker and push the built image to the registry
                    withCredentials([string(credentialsId: 'docker-credentials', variable: 'DOCKER_PASSWORD')]) {
                        sh """
                            echo $DOCKER_PASSWORD | docker login -u your-docker-username --password-stdin
                            docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean the workspace after the build is complete
            cleanWs()
        }
        failure {
            // Clean up Docker system to free space and echo error message
            sh 'docker system prune -f'
            echo 'Build failed. Check logs for details.'
        }
    }
}
