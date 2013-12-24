#考勤系统

##角色权限分配

#####管理员
- 用户管理
- 课程管理
- 参数设置

#####学生
- 查询考勤数据

#####老师
- 课程管理
    - 调课
    - 查询课程表

#####辅导员
- 课程管理
    - 请假
- 查询考勤数据

#####教务处
- 课程管理
- 考勤数据查询
- 参数设置

#####学院领导
- 查询考勤数据

#####学校领导
- 查询考勤数据


##注意：
如果修改端口，上传文件的端口也需要修改 目录:/public/app/js/controllers/course/studentCorrespond.js

##启动程序方法
修改config目录下的config.js文件对应的配置
config下包含不同环境下的配置内容。
    例如：'development'表示开发环境下的配置。
        在环境配置之下的各配置项说明如下：
```
            {
                mysql: {//mysql数据库配置
                    host: '127.0.0.1', //mysql IP地址
                    port: '3306',//mysql 端口
                    user: 'root', //mysql 用户名
                    password: 'zhf',//mysql 密码
                    database: 'ams4u_dev',//数据库名称
                    timezone: 'Asia/Shanghai' //数据库时区，默认就可以了
                },
                redis: {//redis数据库配置，redis数据用来存储用户登录会话数据
                    host: '127.0.0.1', //redis IP地址
                    port: '6379', //redis 端口
                    db: 'sprint2'//redis数据库名,默认即可
                },
                root: rootPath,//根目录，默认即可
            		host: "localhost:8888", //主机地址，随服务器具体的配置而更改
            		Access_Control_Allow_Origins:['http://localhost:8888','http://192.168.0.157:8888'],//允许访问地址，随服务器具体地址而更改
                app: {
                  name: 'AMS4U - Development' //程序名称，默认即可
                }
              }
```
              其他，配置说明，外网：地址：42.121.124.27，密码：Extensivepro4；
                                  程序放在/home/deploy/ams4u/ 目录下
                                  mysql用户名：root ，密码：Exprofuture9；
外网启动:
命令行切换到程序的根目录，执行以下命令：
NODE_ENV=deployTest  forever start app.js
来启动程序。

115启动:
命令行切换到程序的根目录，执行以下命令：
NODE_ENV=innerTest  forever start app.js
来启动程序。


停止程序，执行以下命令：
forever stop app.js

如果停止程序的命令不起作用
执行：
    ps aux | grep node
查看当前启动的node进程，类似于：
    你的用户名 PID   0.1  0.7  3071480  61976 s001  S+   10:23AM   0:00.79 node server.js

然后用kill -9 PID 来杀掉node进程
