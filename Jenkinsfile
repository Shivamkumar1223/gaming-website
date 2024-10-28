pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'gaming-webpage' // Replace with your Docker image name
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = 'your-registry.com' // Replace with your Docker registry
        DOCKER_CREDENTIALS = 'docker-cred-id' // Replace with your Jenkins credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}", '--no-cache .')
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS) {
                        docker.image("${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Docker image built and pushed successfully: ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
        }
        failure {
            echo "Build failed. Check logs for details."
        }
        always {
            cleanWs() // Clean workspace
            sh 'docker system prune -f' // Optional: remove unused Docker images
        }
    }
}
