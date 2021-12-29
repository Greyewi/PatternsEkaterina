class AlarmClock {
  #timerId;

  constructor() {
    this.alarmCollection = [];
    this.#timerId = null;
  }

  /**
   * addClock - добавляет новый звонок в коллекцию существующих.
   * @param time - параметр времени в формате HH:MM - время, когда должно запуститься действие.
   * @param callback - параметр функции-колбека - действие, которое должно запуститься.
   * @param id - параметр идентификатора создаваемого звонка.
   */
  addClock(time, callback, id) {
    if (id === null || id === undefined || id === '') {
      throw new Error('Невозможно идентифицировать будильник. Параметр id не передан')
    }

    const duplicateId = this.alarmCollection.find((item) => item === this.alarmCollection.id)

    if (duplicateId) {
      console.error('Будильник с таким id уже существует.')

      return
    }

    this.alarmCollection.push({
      id,
      time,
      callback
    })

    return this.alarmCollection

  }

  /**
   * removeClock - удаляет определённый звонок.
   * @param id - звонка, который следует удалить.
   */
  removeClock(id) {
    const oldAlarmCollection = JSON.parse(JSON.stringify(this.alarmCollection))
    const newAlarmCollection = this.alarmCollection.filter((item) => item.id !== id)
    this.alarmCollection = newAlarmCollection

    return oldAlarmCollection.length !== newAlarmCollection.length

  }

  /**
   * getCurrentFormattedTime - возвращает текущее время в строковом формате HH:MM.
   */
  getCurrentFormattedTime() {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${hours}:${minutes}`
  }

  /**
   * start - запускает все звонки
   */
  start() {
    const checkClock = (clock) => {
      if (clock.time === this.getCurrentFormattedTime()) {
        clock.callback()
      }
    }
    const setNewInterval= () => {
      this.alarmCollection.map((item) => {
        checkClock(item)
      })

    }

    if (!this.#timerId) {
      this.#timerId = setInterval(()=> setNewInterval(), 1000)
    }

  }

  /**
   * stop - останавливает выполнение всех звонков
   */
  stop() {
    if (this.#timerId) {
      clearInterval(this.#timerId);
    }
    this.#timerId = null

  }

  /**
   * printAlarms - печатает все звонки
   */
  printAlarms() {
    this.alarmCollection.forEach(item => {
      console.log(`Будильник № ${item.id} заведен на ${item.time}`)
    })
  }

  /**
   * clearAlarms - удаляет все звонки
   */
  clearAlarms() {
    this.stop()
    this.alarmCollection.map((item) => {
      this.removeClock(item.id)
    })

    //or
    //  this.alarmCollection=[]

  }
}

const newAlarmClock = new AlarmClock();
newAlarmClock.addClock('10:41', () => console.log('Пора вставать!'),1);
newAlarmClock.start()