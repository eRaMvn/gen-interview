/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: `Interview Practice`,
        description: `Practice your interview skills with questions`,
        author: `Thien Phan`,
        keywords: [
            'interview questions',
            'skill development',
            'interview practice',
            'questions',
            'interview',
        ],
        siteUrl: `https://interviewpractice.info`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-195699045-1',
                head: true,
                anonymize: true,
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`, // Needed for dynamic images
        `gatsby-plugin-react-helmet`,
    ],
};
