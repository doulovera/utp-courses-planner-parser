// Paste your table here
const table = ``

/* -- FUNCTIONS -- */
const cleanTable = (table) => {
  return table
    .replace('Ver cursos electivos', '')
}

/* -- CODE -- */

// Array to store the data
const cycles = []

// Remove phrases that are not needed
const cleanedTable = cleanTable(table)

// Divide text by "Ciclo" word to get each cycle in a different string
const splitByCycleWord = cleanedTable.split('Ciclo').filter(Boolean)

splitByCycleWord.forEach((text) => {
  // Split each cycle by new line and remove empty strings
  const cycleSplitted = text.split('\n').filter(Boolean)

  // If the cycle is empty, return
  if (cycleSplitted.length === 0) return
  // If the cycle is not empty, get the cycle number and the total credits
  const [cycleNumber, ...values] = cycleSplitted
  // Remove the last two values (total credits and empty string)
  const totalCredits = values.at(-1)
  values.pop()
  values.pop()

  let formattedValues = values

  // Cycle object to store the data
  const cycleObj = {
    cycle: cycleNumber.replace(':', ''),
    courses: [],
    totalCredits
  }

  // Iterate over the values to get the data
  for (let i = 0; i < formattedValues.length; i += 6) {
    // Get the current shift and the next one
    const currentShift = formattedValues.slice(i, i + 6)
    const nextShift = formattedValues.slice(i + 6, i + 12)

    const [id, name, hours, credits, type, preReq] = currentShift

    const course = {
      id, name, hours, credits, type, preReq: [preReq], passed: false
    }

    // If the next shift starts with 1000, it means that the course has more than one pre requisite
    let indexForNextShift = 1
    while (nextShift[indexForNextShift]?.startsWith('1000')) {
      course.preReq.push(nextShift[indexForNextShift - 1])
      const indexOfNext = formattedValues.findIndex((el) => el === nextShift[indexForNextShift - 1])
      formattedValues = formattedValues.filter((_, index) => index !== indexOfNext)

      indexForNextShift++
    }

    cycleObj.courses.push(course)
  }
  cycles.push(cycleObj)
})

// Do whatever you want with the data
console.log(cycles)
