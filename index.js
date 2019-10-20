let items = document.querySelectorAll('.carousel .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var el = document.querySelector('.carousel');
swipedetect(el);

let isShown = false;

document.querySelector('.education_container--logo').addEventListener('click', function(element) {
	if (isShown) {
		document.querySelector('.education_container--list').style.display = 'none';
		isShown = false;
	} else {
		document.querySelector('.education_container--list').style.display = 'block';
		isShown = true;
	};
}) 

let isDesktop = true;

document.querySelector('.change-view-btn').addEventListener('click', function(element) {
  if (isDesktop) {
		document.querySelector('.first-project').style.width = '640px';
		document.querySelector('.second-project').style.width = '375px';
    document.querySelector('.change-view-btn').innerHTML = 'Desktop';
  } else {
		document.querySelector('.first-project').style.width = '100%';
		document.querySelector('.second-project').style.width = '100%';
    document.querySelector('.change-view-btn').innerHTML = 'Mobile';
  }
    isDesktop = !isDesktop;
})

document.querySelector('.back-btn').addEventListener('click', function(element) {
	let event = new Event("click");
  document.querySelector('.change-view-btn').dispatchEvent(event);
	document.querySelector('.change-view-btn').click;
	document.querySelector('.first-project').style.display = 'none';
	document.querySelector('.second-project').style.display = 'none';
	document.querySelector('.wrapper').style.display = 'block';
	document.querySelector('.buttons-container').style.display = 'none';
})

document.querySelector('.first-project-image').addEventListener('click', function(element) {
	document.querySelector('.first-project').style.display = 'block';
	document.querySelector('.wrapper').style.display = 'none';
	document.querySelector('.buttons-container').style.display = 'flex';
})

document.querySelector('.second-project-image').addEventListener('click', function(element) {
	document.querySelector('.second-project').style.display = 'block';
	document.querySelector('.wrapper').style.display = 'none';
	document.querySelector('.buttons-container').style.display = 'flex';
})