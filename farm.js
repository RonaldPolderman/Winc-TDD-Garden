// if there aren't environment factors the yield stays the same, else it's yield * environment factor
const getYieldForPlant = (plant, envFactors) => {
    let multiplier = 1;
    if (envFactors) {
        for (eFactor in envFactors) {

            if (plant.factor[eFactor]) {
                environmentPercentage = plant.factor[eFactor][envFactors[eFactor]];
                console.log(environmentPercentage)
                modifier = 1 + environmentPercentage / 100;
                multiplier *= modifier;
            }
        }
    }
    return plant.yield * multiplier;
}

const getYieldForCrop = (input, envFactors) => {
    return getYieldForPlant(input.crop, envFactors) * input.numCrops;
}

const getTotalYield = (harvest, envFactors) => {
    return harvest.crops.reduce((currentYield, crop) => {
        return currentYield + getYieldForCrop(crop, envFactors)
    }, 0)
}

const getCostsForCrop = input => {
    return input.crop.costs * input.numCrops;
}

const getRevenueForCrop = (input, envFactors) => {
    return input.crop.sell_price * getYieldForCrop(input, envFactors);
}

const getProfitForCrop = (input, envFactors) => {
    return getRevenueForCrop(input, envFactors) - getCostsForCrop(input)
}

const getTotalProfit = (harvest, envFactors) => {
    return harvest.crops.reduce((currentProfit, crop) => {
        return currentProfit + getProfitForCrop(crop, envFactors)
    }, 0)
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
}