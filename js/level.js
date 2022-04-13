const app = {
  data() {
    return {
      level: 1,
      mode: 'normal',
      isDed: false,
      gameStatus: 'game',
      noGoUpPlaces: [{
        x: 1,
        y:2
      },{
        x: 3,
        y: 1,
      }],

      noGoDownPlaces: [{
        x: 2,
        y:2,
      },{
        x: 3,
        y:0,
      }],

      noGoPlaces: [{
        x: 2,
        y:0,
      },{
        x: 1,
        y:1,
      },{
        x: 3,
        y:2,
      },{
        x: 1,
        y:3,
      },{
        x: 2,
        y:3,
      },{
        x: 2,
        y:4,
      },{
        x: 4,
        y:4,
      }],
      goalPosition: {
        x: 3,
        y: 4
      },
      character: {
        canMove: true,
        x: 0,
        y:0,
        image: 'idle.png'
      }

    }
  },
  methods: {
    moveCharacter(axis, amount) {
      if (
        this.character.canMove 
        && this.gameStatus === "game"
        && this.character[axis]+ amount  >= 0
        && this.character[axis]+ amount  <= 4
          ){
        this.character[axis] = this.character[axis]+ amount 
        this.character.canMove = false
        if (axis === 'y'){
          this.character.image = 'y.gif'
        }
        if (axis === 'x'){
          this.character.image = 'x.gif'
        }  
        setTimeout(() => {
          this.character.canMove = true
          this.character.image = 'idle.png'
        },500)
        
        const checkDed = this.noGoPlaces.find( (placePosition) =>{
          return placePosition.x === this.character.x && placePosition.y === this.character.y
        })
        const checkWin = this.goalPosition.x === this.character.x && this.goalPosition.y === this.character.y
        if (checkDed || checkWin){
          setTimeout(() => {
            this.gameStatus = checkDed ? 'ded' : 'won';
          },800)
        }
      }

    }
  },
  mounted() {
    window.scrollTo(0,0)
    setTimeout(() => {
      window.scrollTo(0,0)
    },200) 
    const mode = window.localStorage.getItem('game_mode')
    if (mode){
      this.mode = mode
    }
    if (this.mode === 'hardcore'){
      this.redirectUrl = 'index.html'
    }else{
      this.redirectUrl = ''
    }

    window.onkeydown = (e) => {
      console.log(e.keyCode)
      if (e.keyCode=== 37){
        this.moveCharacter('x',-1);
      }
      if (e.keyCode=== 38){

        const check = this.noGoUpPlaces.find( (placePosition) =>{
          return placePosition.x === this.character.x && placePosition.y === this.character.y
        })
        if (!check){
          this.moveCharacter('y',-1);
        }
      }
      if (e.keyCode=== 39){
        this.moveCharacter('x',1);
      }
      if (e.keyCode=== 40){

        const check = this.noGoDownPlaces.find( (placePosition) =>{
          return placePosition.x === this.character.x && placePosition.y === this.character.y
        })

        if (!check){
          this.moveCharacter('y',1);
        }
      }
    }
  }
}


Vue.createApp(app).mount('.app')