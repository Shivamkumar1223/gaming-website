pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'gaming-webpage'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = 'your-registry.com' // Replace with your registry
        DOCKER_CREDENTIALS = 'docker-cred-id' // Replace with your Jenkins credentials ID
        SONAR_TOKEN = credentials('sonar-token')
        NPM_TOKEN = credentials('npm-token')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('gaming-webpage') {
                    sh '''
                        npm config set //registry.npmjs.org/:_authToken=${NPM_TOKEN}
                        npm ci
                    '''
                }
            }
        }

        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    steps {
                        dir('gaming-webpage') {
                            sh 'npm run lint'
                        }
                    }
                }
                stage('Type Check') {
                    steps {
                        dir('gaming-webpage') {
                            sh 'npm run type-check'
                        }
                    }
                }
                stage('SonarQube Analysis') {
                    steps {
                        withSonarQubeEnv('SonarQube') {
                            sh '''
                                sonar-scanner \
                                    -Dsonar.projectKey=gaming-webpage \
                                    -Dsonar.sources=. \
                                    -Dsonar.host.url=http://your-sonarqube-url \
                                    -Dsonar.login=$SONAR_TOKEN
                            '''
                        }
                    }
                }
            }
        }

        stage('Test') {
            steps {
                dir('gaming-webpage') {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                dir('gaming-webpage') {
                    sh 'npm run build'
                }
            }
        }

        stage('Security Scan') {
            steps {
                dir('gaming-webpage') {
                    sh 'npm audit'
                    // Add additional security scans here
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('gaming-webpage') {
                    script {
                        docker.build("${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}", '--no-cache .')
                    }
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

        stage('Deploy to Development') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Add Kubernetes deployment steps here
                    sh '''
                        kubectl apply -f k8s/development/
                        kubectl set image deployment/gaming-webpage gaming-webpage=${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} -n development
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                // Require manual approval before production deployment
                input message: 'Deploy to production?'
                script {
                    // Add Kubernetes deployment steps here
                    sh '''
                        kubectl apply -f k8s/production/
                        kubectl set image deployment/gaming-webpage gaming-webpage=${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} -n production
                    '''
                }
            }
        }
    }

    post {
        success {
            slackSend(
                color: 'good',
                message: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nDeployed to: ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nCheck the logs at: ${env.BUILD_URL}"
            )
        }
        always {
            // Clean workspace
            cleanWs()
            // Remove unused Docker images
            sh 'docker system prune -f'
        }
    }
}
