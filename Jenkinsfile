stage('Install') {
    steps {
        sh '''
        export PATH=$PATH:/usr/bin:/usr/local/bin
        npm install --legacy-peer-deps
        '''
    }
}

stage('Build React') {
    steps {
        sh '''
        export PATH=$PATH:/usr/bin:/usr/local/bin
        npm run build
        '''
    }
}