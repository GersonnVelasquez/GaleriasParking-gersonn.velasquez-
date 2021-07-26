pipeline {
  //Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave_Induccion'
  }

  //Opciones específicas de Pipeline dentro del Pipeline
  options {
    	buildDiscarder(logRotator(numToKeepStr: '3'))
    	disableConcurrentBuilds()
  }

  //Aquí comienzan los “items” del Pipeline
  stages{
    
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout([
          $class: 'GitSCM', 
          branches: [[name: '*/master']], 
          doGenerateSubmoduleConfigurations: false, 
          extensions: [], 
          gitTool: 'Default', 
          submoduleCfg: [], 
          userRemoteConfigs: [[
          credentialsId: 'GitHub_gersonn.velasquez', 
          url:'https://github.com/GersonnVelasquez/GaleriasParking-gersonn.velasquez-.git'
          ]]
        ])

      }
    }
    

    stage('Unit Tests') {
      steps{
        echo "------------>Unit Tests<------------"

      }
    }

    stage('Static Code Analysis') {
     
    }

    stage('Build') {
      steps {
         echo "------------>Build<------------"
      }
    }
  }
}

      
