import Project from '../models/Project.js'
import { verifyToken } from '../jwt.js'

function escapeJsonString(inputString) {
    if (typeof inputString !== 'string') {
        return inputString;
    }
    return JSON.stringify({ content: inputString });
}

const ProjectController = {
    getAll: async (req, res) => {
        try {
            const projects = await Project.findAll()
            res.json(projects)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getById: async (req, res) => {
        try {
            const project = await Project.findByPk(req.params.id)
            if(!project) {
                return res.status(404).json({error: 'Project not found'})
            }
            res.json(project)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    createProject: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const project = await Project.create({
                ...req.body,
                project_content: JSON.stringify({content: []}) 
            })
            res.json(project)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    editProject: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const project = await Project.findByPk(req.params.id)
            if(!project) {
                return res.status(404).json({error: 'Project not found'})
            }
            await project.update(req.body)
            res.json(project)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    editProjectContent: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const project = await Project.findByPk(req.params.id)
            if(!project) {
                return res.status(404).json({error: 'Project not found'})
            }
            await project.update({project_content: escapeJsonString(req.body.content)})
            res.json(project)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteProject: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const project = await Project.findByPk(req.params.id)
            if(!project) {
                return res.status(404).json({error: 'Project not found'})
            }
            await project.destroy()
            res.json({message: 'Project deleted'})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default ProjectController