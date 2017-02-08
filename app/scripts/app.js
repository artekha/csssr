class NerrativeArea {

	constructor(options) {

		this.area = options.textarea;
		this.area.addEventListener('input', this.resizeArea.bind(this));
		window.onload = () => {
			this.area.style.height = `${this.area.scrollHeight}px`;
		}

	}

	resizeArea(e) {

		const area = e.target;

		if (area.scrollHeight > area.offsetHeight) {
			area.style.height = `${area.scrollHeight}px`;
		} else {
			area.style.height = '180px';
			if (area.scrollHeight > area.offsetHeight) area.style.height = `${area.scrollHeight}px`;
		}
		console.log(this.area.scrollHeight, this.area.offsetHeight);

	}

}

class CognitionSlider {

	constructor(options) {

		// Values
		this.anchors = options.anchors;
		this.line = options.line;
		this.pointer = options.pointer;
		this.input = options.input;

		// Methods
		for (let item of this.anchors) {
			item.addEventListener('click', this.changeByAnchor.bind(this));
		}
		this.line.addEventListener('click', this.changeByLine.bind(this));
		this.pointer.ondragstart = () => {
			return false;
		};
		this.pointer.addEventListener('mousedown', this.changeByDrag.bind(this));
		document.onmouseup = () => {
			this.pointer.classList.add('cognition-lane__pointer_animate');
		}

	}

	changeByAnchor(e) {

		e.preventDefault();

		let level = e.target.dataset.level;
		let width = this.line.offsetWidth;
		let input = this.input;
		let position, value;

		switch (level) {
			case '0':
				position = -6;
				value = e.target.textContent;
				break;
			case '1':
				position = width * 25 / 100 - 6;
				value = e.target.textContent;
				break;
			case '2':
				position = width * 50 / 100 - 6;
				value = e.target.textContent;
				break;
			case '3':
				position = width - 9;
				value = e.target.textContent;
				break;
		}

		input.value = value;
		this.pointer.style.left = `${position}px`;

	}

	changeByLine(e) {

		if (e.target.classList.contains('cognition-lane__pointer')) return;
		const width = this.line.offsetWidth;
		let coords = e.target.getBoundingClientRect();
		let percentage = Math.round((e.clientX - coords.left) / width * 100);

		this._determinePosition(percentage, width);

	}

	changeByDrag(e) {

		this.pointer.classList.remove('cognition-lane__pointer_animate');

		e.preventDefault();

		let pointerCoords = this._getCoords(this.pointer);
		let shiftX = e.pageX - pointerCoords.left;
		let lineCoords = this._getCoords(this.line);
		let width = this.line.offsetWidth;

		document.onmousemove = e => {

      let newLeft = e.pageX - shiftX - lineCoords.left;
      if (newLeft < -6) {
        newLeft = -6;
      }

      let rightEdge = this.line.offsetWidth - this.pointer.offsetWidth + 7;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      this.pointer.style.left = `${newLeft}px`;

    }
		document.onmouseup = (e) => {
			this.pointer.classList.add('cognition-lane__pointer_animate');
			e.stopImmediatePropagation();
			document.onmousemove = document.onmouseup = null;
			let width = this.line.offsetWidth;
			let percentage = Math.round((this._getCoords(this.pointer).left - this._getCoords(this.line).left + 6) / width * 100);

			this._determinePosition(percentage, width);

    }

	}

	_getCoords(elem) {

    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }

	_determinePosition(percentage, width) {

		if (percentage <= 13) {
			this.input.value = document.querySelector('[data-level="0"]').textContent;
			this.pointer.style.left = '-6px';
		} else if (percentage > 13 && percentage <= 38) {
			this.input.value = document.querySelector('[data-level="1"]').textContent;
			this.pointer.style.left = `${width * 25 / 100 - 6}px`;
		} else if (percentage > 38 && percentage <= 75) {
			this.input.value = document.querySelector('[data-level="2"]').textContent;
			this.pointer.style.left = `${width * 50 / 100 - 6}px`;
		} else if (percentage > 75) {
			this.input.value = document.querySelector('[data-level="3"]').textContent;
			this.pointer.style.left = `${width - 9}px`;
		}

	}

}

const nerrativeArea = new NerrativeArea({
	textarea: document.querySelector('.nerrative__textarea')
});

const cognitionSlider = new CognitionSlider({
	anchors: document.querySelectorAll('.cognition-lane__anchor'),
	line: document.querySelector('.cognition-lane__progress'),
	pointer: document.querySelector('.cognition-lane__pointer'),
	input: document.querySelector('.cognition-lane__input')
});
