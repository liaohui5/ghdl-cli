## 介绍

快速下载 github 上的代码仓库, 功能类似于 degit, 不同的是, 不会自动缓存, 而是可以选择是否缓存

## 安装

```sh
npm i ghdl-cli-for-liaohui5
```

## 使用

```sh
ghdl vuejs/core -b main
ghdl https://github.com/vuejs/core -b vapor --cache
```

## ToDo

- [x] 实现下载功能
- [x] 实现缓存功能
- [x] 配置 semantic-release 自动发布到 npm 仓库
