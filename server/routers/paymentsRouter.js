const express = require('express');

let creditCards = [
    {
        owner: 'niv',
        ownerId: 1,
        plus: 4000,
        active: true,
        creditScore: 3.9,
    },
    {
        owner: 'shay',
        ownerId: 2,
        plus: 1236,
        active: true,
        creditScore: 2.7,
    },
    {
        owner: 'ronen',
        ownerId: 3,
        plus: 0,
        active: false,
        creditScore: 4.0,
    },
    {
        owner: 'ilan',
        ownerId: 4,
        plus: 5000,
        active: true,
        creditScore: 4.2,
    },
];

const paymentsRouter = express.Router();

paymentsRouter.get('/', (req, res) => {
    const { owner, ownerId } = req.query;
    if (!owner || !ownerId) {
        // check if we've got all the needed parameters
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'please provide owner AND owner id',
        });
        return;
    }

    const data = creditCards.find(
        creditCard =>
            creditCard.owner === owner && creditCard.ownerId === +ownerId
    );

    if (data) {
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data,
        });
        return;
    }

    res.status(400).json({
        status: 'failure',
        statusCode: 400,
        error: 'invalid owner or ownerId',
    });
});

paymentsRouter.get('/superuser', (req, res) => {
    const { owner, ownerId } = req.query;
    if (!owner || !ownerId) {
        // check if we've got all the needed parameters
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'please provide owner AND owner id',
        });
        return;
    }

    const card = creditCards.find(
        creditCard =>
            creditCard.owner === owner && creditCard.ownerId === +ownerId
    );

    if (card) {
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: card.creditScore > 3.5,
        });
        return;
    }

    res.status(400).json({
        status: 'failure',
        statusCode: 400,
        error: 'invalid owner or ownerId',
    });
});

paymentsRouter.post('/', (req, res) => {
    const { owner, ownerId, plus, active, creditScore } = req.body;

    if (!owner || !ownerId || !plus || !active || !creditScore) {
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'please provide owner, ownerId, plus, active, creditScore',
        });
        return;
    }

    const creditCard = {
        owner,
        ownerId: +ownerId,
        plus: +plus,
        active,
        creditScore: +creditScore,
    };

    creditCards.push(creditCard);
    res.status(201).json({
        status: 'success',
        statusCode: 201,
        data: creditCards,
    });
});

paymentsRouter.put('/updateStatus', (req, res) => {
    const { status, owner, ownerId } = req.body;
    if (status === undefined || !owner || !ownerId) {
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'please provide owner AND owner id AND status',
        });
        return;
    }

    const index = creditCards.findIndex(
        card => card.owner === owner && card.ownerId === +ownerId
    );
    if (index === -1) {
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'invalid owner or owner id',
        });
        return;
    } else {
        creditCards[index].active = status;
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: creditCards[index],
        });
    }
});

paymentsRouter.put('/bonus', (req, res) => {
    const { plus, owner, ownerId } = req.body;
    if (!plus || !owner || !ownerId) {
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'please provide owner AND owner id AND plus',
        });
        return;
    }

    const index = creditCards.findIndex(
        card =>
            card.owner === owner &&
            card.ownerId === +ownerId &&
            card.plus === +plus
    );

    if (index === -1) {
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'invalid owner or owner id or plus',
        });
    } else {
        creditCards[index].plus += 500;
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: creditCards[index],
        });
    }
});

paymentsRouter.delete('/', (req, res) => {
    const { ownerId } = req.params;
    if (!ownerId) {
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'please provide owner id',
        });
    }

    creditCards = creditCards.filter(card => card.ownerId !== +ownerId);
    res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: 'deleted',
    });
});

module.exports = paymentsRouter;