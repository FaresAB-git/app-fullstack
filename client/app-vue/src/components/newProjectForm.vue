<script setup> 
</script>

<template>
   <div id="container">
        <form id="form">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title"><br><br>
            <label for="description">Description:</label>
            <input type="text" id="description" name="description"><br><br>
            <input type="submit" value="Submit">
        </form>
        </div>
</template>

<style scoped>


#form{
    padding: 20px;
    background-color: whitesmoke;
    width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
}


</style>