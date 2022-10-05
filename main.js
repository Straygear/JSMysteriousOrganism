// Returns a random DNA base
  const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }

  //array that will contain the differint specimens
  const specimenArray = [];

  const createStrongSpecimen = () => {
    let specimenNumber = 0
    let numberOfStrongSpecimen = 0;
    do {
      obj = pAeqourFactory(specimenNumber, mockUpStrand());
      specimenNumber++;
      if(obj.willLikelySurvive()){
        specimenArray.push(obj);
        numberOfStrongSpecimen++;
      }
    } while (numberOfStrongSpecimen < 30);

  }

 
  

  //this creates a specimen, specimen can only have unique numbers
  pAeqourFactory = (number, dnaBase) => {
    return {
      _specimenNum: number,
      _dna: dnaBase,
      mutate(){
        let newStrand = returnRandBase();
        const randomBaseIndex = Math.floor(Math.random() * 15);
        console.log(`Index: ${randomBaseIndex}, dnaStrand: ${newStrand}`);
        while(this._dna[randomBaseIndex] === newStrand){
          newStrand = returnRandBase();
          console.log(`New dnaStrand: ${newStrand}`);
        }
        this._dna[randomBaseIndex] = newStrand;
        return this._dna;
      },
      compareDNA(pAeqour){
        let count = 0;
        //I used this style of for because its easier for me to check the index
        for(let i = 0; i < this._dna.length; i++){
          for(let j = 0; j < pAeqour._dna.length; j++){
            if(i === j && this._dna[i] === pAeqour._dna[j]){
              count++;
            }
          }
        }
        console.log(`number of dnaStrands incommon: ${count}`)
        const percentageIncommmon = count / 15 * 100;
        console.log(`specimen #${this._specimenNum} and specimen #${pAeqour._specimenNum} have ${percentageIncommmon.toFixed()}% DNA in common`)
      },
      willLikelySurvive(){
        let count = 0;
        for(const dna of this._dna){
          if(dna === 'C' || dna === 'G'){
            count++;
          }
        }
        const percentage = count / 15 * 100;
        if(percentage >= 60){
          return true;
        } else {
          return false;
        }
      }
    }
  };
  

createStrongSpecimen();


console.log(specimenArray);