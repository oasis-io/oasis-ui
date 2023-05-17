<template>
    <div>
        <button @click="Check">Click me to check</button>
    </div>
</template>

<script setup lang="ts">
const Check = () => {
    let array = [1, 2, 3, 4, 5];

    array.forEach((element, index) => {
        console.log(`Element ${element} is at position ${index}`);
    });
}
</script>