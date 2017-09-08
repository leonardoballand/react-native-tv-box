pipeline {
  agent none
  stages {
    stage('Checkout') {
      steps {
        sh 'checkout scm'
        echo 'Checkout Stage'
      }
    }
    stage('Test') {
      steps {
        echo 'Test stage'
      }
    }
    stage('Build') {
      steps {
        echo 'Build Stage'
      }
    }
  }
}