import {RadialControl, LedControl, DisplayMultiControl, LiniarControl} from "./vue_steelseries.js";

const App = {
	data() {
		return {
			placeholderString: 'enter note',
			title: 'Hellow',
			inputValue: '',
			notes: ['tst 1', 'dfds 2'],
			temp: 0
		}
	},
	methods: {
		//это вариант подходит для v-bind
		inputChangeHandler(event){
			this.inputValue = event.target.value
		},
		addNewNote(){
			if(this.inputValue !== ''){
				this.notes.push(this.inputValue);
				this.inputValue = '';
			}
		},
		removeNote(idx, event){
			this.notes.splice(idx, 1);
		},
		myUpperCase(item){
			return item.toUpperCase();
		},
		doubleCount(){
			console.log('method doubleCount');
			return this.notes.length * 2
		},
		getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		},
		randomize(){
			this.temp = this.getRandomInt(100);
		}
	},
	computed: {
		//Это вычисляемое значение в шаблоне будет как свойство
		doubleCountComputed(){
			console.log('method doubleCountComputed');
			return this.notes.length * 2;
		},
	},
	watch: {
		// Это функция следилка за изменениями
		inputValue(value){
			if(value.length > 10){
				console.log('input Value changed', value);
			}
		},
		notes(value){
			console.log('Notes changed');
		}
	}
}

let app = Vue.createApp(App);
app.component('steelvue', RadialControl);
app.component('ledvue', LedControl);
app.component('lcdvue', DisplayMultiControl);
app.component('liniarvue', LiniarControl);


app.mount('#page-wrapper');
