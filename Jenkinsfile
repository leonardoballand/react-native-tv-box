pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        echo 'Checkout Stage'
        checkout scm
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