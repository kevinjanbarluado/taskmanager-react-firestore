require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore with credentials
const firestore = new Firestore({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Register CORS middleware
fastify.register(fastifyCors);

// Tasks collection
const tasksCollection = firestore.collection('tasks');

// GET all tasks
fastify.get('/api/tasks', async (request, reply) => {
    try {
        const snapshot = await tasksCollection.get();
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return tasks;
    } catch (err) {
        reply.status(500).send(err);
    }
});

// GET a single task by ID
fastify.get('/api/tasks/:id', async (request, reply) => {
    try {
        const task = await tasksCollection.doc(request.params.id).get();
        if (!task.exists) {
            return reply.status(404).send({ error: 'Task not found' });
        }
        return { id: task.id, ...task.data() };
    } catch (err) {
        reply.status(500).send(err);
    }
});

// POST a new task
fastify.post('/api/tasks', async (request, reply) => {
    try {
        const newTask = request.body;
        const docRef = await tasksCollection.add(newTask);
        return { id: docRef.id, ...newTask };
    } catch (err) {
        reply.status(500).send(err);
    }
});

// PUT (update) a task by ID
fastify.put('/api/tasks/:id', async (request, reply) => {
    try {
        const updatedTask = request.body;
        await tasksCollection.doc(request.params.id).set(updatedTask, { merge: true });
        return { success: true };
    } catch (err) {
        reply.status(500).send(err);
    }
});

// DELETE a task by ID
fastify.delete('/api/tasks/:id', async (request, reply) => {
    try {
        await tasksCollection.doc(request.params.id).delete();
        return { success: true };
    } catch (err) {
        reply.status(500).send(err);
    }
});

//Port to listen on
const PORT = process.env.PORT || 3001;

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: PORT });
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
