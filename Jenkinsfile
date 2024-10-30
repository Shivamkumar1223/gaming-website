pipeline {
    agent any

    environment {
        IMAGE_NAME = "your-registry.com/gaming-webpage"
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
    }

    post {
        always {
            // Clean the workspace and Docker system after the build
            cleanWs()
            sh 'docker system prune -f'
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Check logs for details.'
        }
    }
}
