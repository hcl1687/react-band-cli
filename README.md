# react-band-cli
The react-band command line interface.

# Install
npm install -g react-band-cli

# Create project
create a project with react-band skeleton:

```bash
react-band-cli -i test -d as
```

# Options
| option | description | example |
| -      | -           | -       |
| -i --init name | create a folder named 'name' in the current directory and init project | react-band-cli -i test |
| -d --demo name | init project with the specific demo. Current provide these demos: default,basic,basic_menu,basic_menu_antd,redux_menu_antd,as | react-band-cli -i test -d as |
| -o --overwrite | init project, if the project folder has exsited, overwrite it. | react-band-cli -i test -d as -o
