class NerrativeArea {

	constructor(options) {

		this.area = options.textarea;
		this.area.addEventListener('input', this.resizeArea.bind(this))

	}

	resizeArea(e) {

		const area = e.target;

		if (area.scrollHeight > area.offsetHeight) area.style.height = `${area.scrollHeight}px`
		console.log(`${area.scrollHeight} ${area.offsetHeight}`);

	}

}

const nerrativeArea = new NerrativeArea({
	textarea: document.querySelector('textarea')
});
