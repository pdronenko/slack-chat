# Slack Chat

[![Maintainability](https://api.codeclimate.com/v1/badges/97657df9231822672195/maintainability)](https://codeclimate.com/github/pdronenko/frontend-project-lvl4/maintainability)
[![Build Status](https://travis-ci.org/pdronenko/slack-chat.svg?branch=master)](https://travis-ci.org/pdronenko/slack-chat)

Simple chat (slack clone). You can manage channels and chat as much as you want :-)

##

To create this chat I used **React + Redux + Bootstrap**. Had some problems with **Redux Form**. On chat mount, new data from server comes through **gon**, requests to the server makes by **axios** (I followed **REST** architecture). New data from server comes through **WebSockets**. I Made bundle with **webpack** and deployed it on **heroku**.

В этом проекте использовал все изученные ранее технологии.
Использовал связку **React + Redux + Bootstrap**. При первой загрузке данные с сервера поступают через **gon**, запросы на сервер с помощью **axios** (придерживался **REST** архитектуры). Пришлось повозиться с **Redux Form**. Изменения приходят через **WebSockets**. Деплоил всё с помощью **webpack** на **heroku**.

## Live Preview
[https://pdronenko-chat.herokuapp.com](https://pdronenko-chat.herokuapp.com)
