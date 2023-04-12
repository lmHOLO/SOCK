pipeline {
    agent any

    tools {
        jdk 'jdk11'
        gradle 'gradle'
        nodejs 'node'
    }

    environment {
        EC2_HOST = 'j8c103.p.ssafy.io'
        EC2_USER = 'ubuntu'
        EC2_KEY = '2d52d549-448d-4cd1-841e-636b1e00f8a2'
    }

    stages {
      stage('Checkout') {
            steps {
                echo 'Checking out from Git repository...'
                git branch: 'master',
                credentialsId: '2a3c7332-12a5-4bb6-b426-c2fb51e3705a',
                url: 'https://lab.ssafy.com/geon1120/jenkins-build-test.git'
            }
        }

        stage('Build-Backend') {
            steps {
                echo 'Building the Spring Backend project...'
                dir('back/sock') { // 해당 폴더로 이동
                    sh 'chmod +x gradlew'
                    sh './gradlew clean build' // 테스트를 포함하여 빌드
                }
            }
        }

        stage('Build-Frontend') {
            steps {
                echo 'Building the React Frontend project...'
                dir('front') { // 해당 폴더로 이동
                    sh 'npm install -g yarn'
                    sh 'yarn install'
                    sh 'CI=false yarn build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to the EC2 instance..'
                sshagent(credentials: ["${EC2_KEY}"]) {
                    sh "scp back/sock/build/libs/sock-0.0.1-SNAPSHOT.jar ${EC2_USER}@${EC2_HOST}:~/backend"
                    sh "scp back/sock/Dockerfile ${EC2_USER}@${EC2_HOST}:~/backend/"
                    sh "scp -r front/Dockerfile front/default.conf front/build ${EC2_USER}@${EC2_HOST}:~/frontend/"

                    sh "ssh ${EC2_USER}@${EC2_HOST} 'cd ~/backend && bash ./deploy.sh'"
                    sh "ssh ${EC2_USER}@${EC2_HOST} 'cd ~/frontend && bash ./deploy.sh'"
                }
            }
        }
    }
}