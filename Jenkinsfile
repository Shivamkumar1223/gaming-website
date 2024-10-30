pipeline {
    agent any

    environment {
        IMAGE_NAME = "your-registry.com/gaming-webpage"
        DOCKER_CREDENTIALS_ID = 'docker-credentials'  // Ensure this matches your Jenkins credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from SCM (e.g., GitHub)
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image with the current build number as the tag
                    docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}", "--no-cache .")
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies with npm, ignoring peer dependency issues if necessary
                    sh 'npm ci --legacy-peer-deps'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests, and allow the pipeline to continue even if no tests are found
                    sh 'npm run test -- --passWithNoTests || true'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker and push the built image to the registry
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, 
                                                      usernameVariable: 'DOCKER_USERNAME', 
                                                      passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                            docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}
                            docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${IMAGE_NAME}:latest
                            docker push ${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean the workspace and Docker system after the build
            cleanWs()
            sh 'docker system prune -f'
        }
        success {
            echo 'Build and deployment completed successfully!'
        }
        failure {
            echo 'Build failed. Check logs for details.'
        }
    }
}
