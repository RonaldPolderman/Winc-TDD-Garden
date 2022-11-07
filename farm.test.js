const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant without environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    const avocado = {
        name: "avocado",
        yield: 17,
    };

    test("Get yield for plant without environment factors", () => {
        expect(getYieldForPlant(avocado)).toBe(17);
    });

    test("Get yield for plant including environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };
        const envFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, envFactors)).toBe(15)
    })
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        }
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
    test("get yield for crop, simple", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        }
        const input = {
            crop: pumpkin,
            numCrops: 7,
        }
        expect(getYieldForCrop(input)).toBe(28)
    })

    test("Get yield for crop including environmental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const input = {
            crop: corn,
            numCrops: 20,
        };
        const environmentFactors = {
            sun: "high",
            temperature: "high"
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(90)
    })
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
    test("Calculate total yield including environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: -25,
                },
                temperature: {
                    low: 0,
                    medium: 25,
                    high: -25,
                },
            }
        };
        const environmentFactors = {
            sun: "high",
            wind: "low",
            temperature: "medium"
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops }, environmentFactors)).toBe(35)
    })
});

describe("getCostsForCrop", () => {
    test("get the costs for an amount of a crop", () => {
        const corn = {
            costs: 2
        };
        const input = { crop: corn, numCrops: 15 };
        expect(getCostsForCrop(input)).toBe(30);
    })
})

describe("getRevenueForCrop", () => {
    test("get the revenue for a single crop", () => {
        const corn = {
            yield: 3,
            sell_price: 4
        }
        const input = { crop: corn, numCrops: 12 };
        expect(getRevenueForCrop(input)).toBe(144);
    })
    test("get the revenue for a single crop including environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            sell_price: 5,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: -25,
                },
                temperature: {
                    low: 0,
                    medium: 25,
                    high: -25,
                },
            }
        };
        const environmentFactors = {
            sun: "high",
            wind: "low",
            temperature: "medium"
        };
        const input = { crop: pumpkin, numCrops: 21 };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(656.25)
    })
})

describe("getProfitForCrop", () => {
    test("get the profit for a single crop", () => {
        const corn = {
            yield: 3,
            costs: 2,
            sell_price: 4
        }
        const input = { crop: corn, numCrops: 9 };
        expect(getProfitForCrop(input)).toBe(90);
    })
    test("get profit for a single crop including environment factors", () => {
        const pumpkin = {
            yield: 4,
            costs: 6,
            sell_price: 5,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: -25,
                },
                temperature: {
                    low: 0,
                    medium: 25,
                    high: -25,
                },
            }
        };
        const environmentFactors = {
            sun: "high",
            wind: "low",
            temperature: "medium"
        };
        const input = { crop: pumpkin, numCrops: 12 };
        expect(getProfitForCrop(input, environmentFactors)).toBe(303)
    })

})

describe("getTotalProfit", () => {
    test("get the profit of multiple crops", () => {
        const corn = {
            yield: 3,
            costs: 2,
            sell_price: 4
        }
        const pumpkin = {
            yield: 4,
            costs: 3,
            sell_price: 5
        }
        const crops = [
            { crop: corn, numCrops: 8 },
            { crop: pumpkin, numCrops: 22 }
        ]
        expect(getTotalProfit({ crops })).toBe(454)
    })
    test("get the profit of multiple crops including environment factors", () => {
        const corn = {
            yield: 3,
            costs: 2,
            sell_price: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        }
        const pumpkin = {
            yield: 4,
            costs: 3,
            sell_price: 5,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: -25,
                },
                temperature: {
                    low: 0,
                    medium: 25,
                    high: -25,
                },
            }
        }
        const avocado = {
            name: "avocado",
            yield: 8,
            costs: 1,
            sell_price: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 25,
                    medium: 0,
                    high: 0,
                },
                temperature: {
                    low: -30,
                    medium: 0,
                    high: 30,
                },
            }
        }
        const environmentFactors = {
            sun: "low",
            wind: "high",
            temperature: "low"
        };
        const crops = [
            { crop: corn, numCrops: 12 },
            { crop: pumpkin, numCrops: 15 },
            { crop: avocado, numCrops: 40 },
        ]
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(524)
    })
})