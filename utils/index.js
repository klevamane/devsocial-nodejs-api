export const getExperience = (req) => {
    return {
        title: req.body.title,
        location: req.body.location,
        company: req.body.company,
        description: req.body.description,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
    };
}

export const getEducation = (req, fromDate) => {
    return {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        description: req.body.description,
        from: fromDate,
        to: req.body.to,
        current: req.body.current,
    };
}
