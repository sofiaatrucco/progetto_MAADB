const neo4j = require('neo4j-driver');

// Funzione per ottenere la media dei reply ai commenti
async function getAverageReplies() {
    const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'progetto'));
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (c1:Comment)-[:REPLY_OF]->(c2:Comment)
            WITH c2, count(c1) AS numReplies
            RETURN avg(numReplies) AS averageReplies
        `);
        const averageReplies = result.records[0].get('averageReplies');
        return { success: true, averageReplies };
    } catch (error) {
        console.error('Errore durante la query su Neo4j', error);
        throw error;
    } finally {
        await session.close();
    }
}

// Funzione per ottenere la correlazione tra numero di amici e numero di post
async function getFriendsPostsCorrelation() {
    const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'progetto'));
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (p:Person)
            OPTIONAL MATCH (p)-[:KNOWS]-(f:Person)
            WITH p, count(DISTINCT f) AS numFriends
            OPTIONAL MATCH (p)<-[:POST_HAS_CREATOR]-(po:Post)
            WITH p.id AS personId, numFriends, count(po) AS numPosts
            WITH collect({friends: numFriends, posts: numPosts}) AS data

            WITH data,
                reduce(s = 0.0, d IN data | s + d.friends) / size(data) AS meanFriends,
                reduce(s = 0.0, d IN data | s + d.posts) / size(data) AS meanPosts

            WITH data, meanFriends, meanPosts,
                reduce(s = 0.0, d IN data | s + (d.friends - meanFriends)*(d.posts - meanPosts)) AS numerator,
                sqrt(reduce(s = 0.0, d IN data | s + (d.friends - meanFriends)^2)) AS denominatorX,
                sqrt(reduce(s = 0.0, d IN data | s + (d.posts - meanPosts)^2)) AS denominatorY

            RETURN 
            CASE 
                WHEN denominatorX * denominatorY = 0 THEN 0
                ELSE numerator / (denominatorX * denominatorY) 
            END AS correlation
        `);

        const correlation = result.records[0].get('correlation');
        return { success: true, correlation };
    } catch (error) {
        console.error('Errore durante la query Neo4j', error);
        throw error;
    } finally {
        await session.close();
    }
}

// Funzione per ottenere i giorni in cui le persone hanno messo like ai commenti
async function getLikeDays(ids, startDate, endDate) {
    const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'progetto'));
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (p:Person)-[r:LIKES_COMMENT]->(c:Comment)
            WHERE p.id IN $ids 
            AND date(r.creationDate) >= date($startDate) 
            AND date(r.creationDate) <= date($endDate)
            RETURN DISTINCT date(r.creationDate) AS day
            ORDER BY day ASC
            `,
            { ids, startDate, endDate }
        );

        // mappa i giorni in un array di stringhe (o date)
        const days = result.records.map(record => record.get('day').toString());

        return { success: true, days };

    } catch (error) {
        console.error('Errore durante la query getLikeDays su Neo4j:', error);
        throw error;
    } finally {
        await session.close();
    }
}


// Funzione per ottenere gli ID delle persone che studiano all'università
async function getUniversityId() {
    const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'progetto'));
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (p:Person)-[:STUDY_AT]->(:Organisation)
            RETURN p.id AS personId
        `);

        // Estrai tutti gli ID dai record
        const ids = result.records.map(record => record.get('personId').toNumber());
        return { success: true, ids };
    } catch (error) {
        console.error('Errore durante la query su Neo4j per le persone universitarie', error);
        throw error;
    } finally {
        await session.close();
    }
}

// Funzione per ottenere gli ID delle persone che lavorano
async function getWorkerId() {
    const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'progetto'));
    const session = driver.session();

    try {
        const result = await session.run(`
           MATCH (p:Person)-[WORK_AT]->(:Organisation)
           RETURN p.id AS personId
        `);

        // Estrai tutti gli ID dai record
        const ids = result.records.map(record => record.get('personId').toNumber());
        return { success: true, ids };
    } catch (error) {
        console.error('Errore durante la query su Neo4j per le persone lavoratrici', error);
        throw error;
    } finally {
        await session.close();
    }
}

// funzione per trovare l'id delle persone che fanno quell'università
async function getUniversityPeopleId(universityName) {
    const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'progetto'));
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (p:Person)-[:STUDY_AT]->(o:Organisation {name: $universityName})
            RETURN p.id AS personId
            `,
            { universityName }
        );

        const ids = result.records.map(record => record.get('personId').toNumber());

        return { success: true, ids };
    } catch (error) {
        console.error('Errore durante la query Neo4j:', error);
        throw error;
    } finally {
        await session.close();
    }
}

// Funzione per ottenere gli ID dei forum e il numero di follower
async function getForumId(personIds) {
    const neo4j = require('neo4j-driver');
    const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'progetto'));
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (f:Forum)-[:HAS_MEMBER]->(p:Person)
            WHERE p.id IN $personIds
            RETURN f.title AS title, COUNT(*) AS followersCount
            ORDER BY followersCount DESC
            LIMIT 3
        `, { personIds });

        // Mappa i risultati in un array di oggetti con forumId e followersCount
        const forums = result.records.map(record => ({
            title: record.get('title').toString(),
        }));

        return { success: true, forums };
    } catch (error) {
        console.error('Errore durante la query su Neo4j per ottenere gli ID dei forum:', error);
        throw error;
    } finally {
        await session.close();
    }
}




module.exports = {
    getAverageReplies,
    getFriendsPostsCorrelation,
    getLikeDays,
    getUniversityId,
    getWorkerId,
    getUniversityPeopleId,
    getForumId
};

