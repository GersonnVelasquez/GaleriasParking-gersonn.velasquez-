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

  //Una sección que define las herramientas “preinstaladas” en Jenkins
  tools {
    jdk 'JDK8_Centos' //Verisión preinstalada en la Configuración del Master
  }
/*	Versiones disponibles
      JDK8_Mac
      JDK6_Centos
      JDK7_Centos
      JDK8_Centos
      JDK10_Centos
      JDK11_Centos
      JDK13_Centos
      JDK14_Centos
*/

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

    stage('Dependencies Installation') {
      steps{
        echo "------------>Dependencies Installation<------------"
        sh "npm install"
      }
    }

         
    
    stage('Unit Tests') {
      steps{
        echo "------------>Unit Tests<------------"
         sh "ng test --browsers=ChromeHeadless --watch=false --code-coverage"
      }
    }

    stage('Static Code Analysis') {
      
      steps{
        echo '------------>Análisis de código estático<------------'
        withSonarQubeEnv('Sonar') {
            sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
           }
        }
      }

      stage('Build') {
        steps {
          echo "------------>Build<------------"
           sh "ng build --prod"
        }
      }  
      
    }

     post {
            always {
              echo 'This will always run'
            }
            success {
              echo 'This will run only if successful'
            }
            failure {
              echo 'This will run only if failed'
              mail (to: 'gersonn.velasquez@ceiba.com.co',
                    subject: "Failed Pipeline:${currentBuild.fullDisplayName}",
                    body: "Something is wrong with ${env.BUILD_URL}")

            }
            unstable {
              echo 'This will run only if the run was marked as unstable'
            }
            changed {
              echo 'This will run only if the state of the Pipeline has changed'
              echo 'For example, if the Pipeline was previously failing but is now successful'
            }
          }
        }

      
