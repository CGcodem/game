const app = {
  data() {
    return {
      character: {
        x: 0,
        y:0,
        image: 'images/go.png'
      }

    }
  },
  methods: {
    moveCharacter(axis, amount) {
      this.character[axis] = this.character[axis]+ amount 
    }
  },
  mounted() {
    window.onkeydown = (e) => {
      console.log(e.keyCode)
      if (e.keyCode=== 37){
        this.moveCharacter('x',-1);
      }
      if (e.keyCode=== 38){
        this.moveCharacter('y',-1);
      }
      if (e.keyCode=== 39){
        this.moveCharacter('x',1);
      }
      if (e.keyCode=== 40){
        this.moveCharacter('y',1);
      }
    }
  }
}


Vue.createApp(app).mount('.app')