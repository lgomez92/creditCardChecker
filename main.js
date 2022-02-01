// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]
const ex = [4,5,3,9,6,8,9,8,8,7,7,0,5,7,9,8];

// Add your functions below:
// Check an individual card to make sure is valid using the Luhn Algorithm
const validateCred = card => {
  let totalSum = 0;
  let tempNum;
  card.reverse();            
  for(let i = 0; i < card.length; i++) {
    if(i % 2 === 0 ) {
      totalSum += card[i];
    } else {
      tempNum = card[i] * 2;
      if(tempNum > 9) {
        tempNum -= 9;
      }
      totalSum += tempNum;
    }
  }  
  card.reverse();
  return totalSum % 10 === 0 ? true : false;
}

// Checks through the nested array for which numbers are invalid, and returns another nested array of invalid cards
const findInvalidCards = cards => {
  let invalidCards = [];
  let invalidCounter = 0;
  for(let i = 0; i < cards.length; i++) {
    if (validateCred(cards[i]) === false) {
      invalidCards[invalidCounter] = cards[i];
      invalidCounter++;
    }
  }
  return invalidCards;
}

// Checks the invalid cards and identify to which company they belong to and return array of companies
const idInvalidCardCompanies = invCards => {
  let invalidCompanies = [];
  let invCompaniesCounter = 0;
  for (let i = 0; i < invCards.length; i++) {   // Checks first digit and adds it to the company array for invalid cards
    switch(invCards[i][0]) {
      case 3:
        invalidCompanies[invCompaniesCounter] = 'Amex (American Express)';
        invCompaniesCounter++;
        break;
      case 4:
        invalidCompanies[invCompaniesCounter] = 'Visa';
        invCompaniesCounter++;
        break;
      case 5:
        invalidCompanies[invCompaniesCounter] = 'Mastercard';
        invCompaniesCounter++;
        break;
      case 6: 
        invalidCompanies[invCompaniesCounter] = 'Discover';
        invCompaniesCounter++;
        break;
      default:
        console.log('Company not found');
        break;
    }
  }  
  // Removes duplicates
  const uniqueCompanies = [...new Set(invalidCompanies)];
  return uniqueCompanies;
}

const invalidCards = findInvalidCards(batch);
const invalidCompanies = idInvalidCardCompanies(invalidCards);
console.log(`Companies with invalid cards are: ${invalidCompanies.join(', ')} `);

