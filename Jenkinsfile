pipeline {
    agent any
    
    environment {
        PATH = "/usr/local/bin:${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/oadelua/playwright-ecommerce.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }
        
        stage('Run Smoke Tests') {
            steps {
                sh 'npx playwright test --grep @smoke --project=chromium'
            }
        }
        
        stage('Run Regression Tests') {
            steps {
                sh 'npx playwright test --grep @regression --project=chromium'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}