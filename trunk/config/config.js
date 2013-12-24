var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
    mysql: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'zhf',
        database: 'ams4u_dev',
        timezone: 'Asia/Shanghai'
    },
    redis: {
        host: '127.0.0.1',
        port: '6379',
        db: 'sprint2'
    },
    root: rootPath,
		host: "localhost:8888",
		Access_Control_Allow_Origins:['http://localhost:8888','http://192.168.0.157:8888'],
    app: {
      name: 'AMS4U - Development'
    }
  },
  localInnerTest: {
    mysql: {
      host: '192.168.0.115',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'ams4u_test',
      timezone: 'Asia/Shanghai'
    },
    redis: {
      host: '127.0.0.1',
      port: '6379',
      db: 'sprint2'
    },
    root: rootPath,
    host: "192.168.0.115",
    Access_Control_Allow_Origins:['http://192.168.0.115','http://localhost'],
    app: {
      name: 'AMS4U - Test'
    }
  },
  innerTest: {
    mysql: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'ams4u_test',
        timezone: 'Asia/Shanghai'
    },
    redis: {
        host: '127.0.0.1',
        port: '6379',
        db: 'sprint2'
    },
    root: rootPath,
		host: "192.168.0.115",
		Access_Control_Allow_Origins:['http://192.168.0.115'],
    app: {
      name: 'AMS4U - Test'
    }
  },
  deployTest: {
    mysql: {
      host: '10.200.70.113',
      port: '3306',
      user: 'root',
      password: 'Exprofuture9',
      database: 'ams4u_test',
      timezone: 'Asia/Shanghai'
    },
    redis: {
      host: '127.0.0.1',
      port: '6379',
      db: 'sprint2'
    },
    root: rootPath,
		host: "42.121.124.27",
    Access_Control_Allow_Origins:['http://42.121.124.27'],
    app: {
      name: 'AMS4U - Test'
    }
  },
  production: {
    mysql: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'zhf',
        database: 'ams4u_dev',
        timezone: 'Asia/Shanghai'
    },
    redis: {
        host: '127.0.0.1',
        port: '6379',
        db: 'sprint2'
    },
    root: rootPath,
		host: "42.121.19.191",
		Access_Control_Allow_Origins:['http://42.121.19.191'],
    app: {
      name: 'PassPro -Customer Relationship Management - Production'
    }
  }
}