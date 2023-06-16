<template>
    <keep-alive>
      <transition name="fade">
        <h1>会话管理</h1>
      </transition>
    </keep-alive>
  </template>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>