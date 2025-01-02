import { Request, Response } from 'express'
import { karyawanService } from '../services/karyawanService'

export const karyawanController = {
  async getAllKaryawan(req: Request, res: Response) {
    try {
      const {
        departmentId,
        position,
        status,
        minSalary,
        maxSalary,
        startDate,
        name
      } = req.query

      const filters = {
        departmentId: departmentId ? Number(departmentId) : undefined,
        position: position ? String(position) : undefined,
        status: status !== undefined ? status === 'true' : undefined,
        joindate: startDate ? String(startDate) : undefined,
        name: name ? String(name) : undefined
      }

      const minSalaryNum = minSalary ? Number(minSalary) : undefined
      const maxSalaryNum = maxSalary ? Number(maxSalary) : undefined

      const karyawanList = await karyawanService.getAllKaryawan(
        filters,
        minSalaryNum,
        maxSalaryNum
      )

      if (karyawanList.length > 0) {
        res.status(200).json({
          message: 'Karyawan fetched successfully with filters',
          karyawanList,
          status: 'success'
        })
      } else {
        res.status(404).json({
          error: 'No karyawan found with the provided filters',
          status: 'failure'
        })
      }
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch karyawan',
        details: (error as Error).message,
        status: 'error'
      })
    }
  },

  async getKaryawanById(req: Request, res: Response) {
    try {
      const karyawan = await karyawanService.getKaryawanById(
        Number(req.params.id)
      )
      if (karyawan) {
        res.status(200).json({
          message: 'Karyawan fetched successfully',
          karyawan,
          status: 'success'
        })
      } else {
        res.status(404).json({
          error: 'Karyawan not found',
          karyawanId: req.params.id,
          status: 'failure'
        })
      }
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch karyawan',
        details: (error as Error).message,
        status: 'error'
      })
    }
  },

  async createKaryawan(req: Request, res: Response) {
    try {
      const newKaryawan = await karyawanService.createKaryawan(req.body)
      res.status(201).json({
        message: 'Karyawan created successfully',
        karyawan: newKaryawan,
        status: 'success'
      })
    } catch (error) {
      res.status(500).json({
        error: 'Failed to create karyawan',
        details: (error as Error).message,
        status: 'error'
      })
    }
  },

  async updateKaryawan(req: Request, res: Response) {
    try {
      const updatedKaryawan = await karyawanService.updateKaryawan(
        Number(req.params.id),
        req.body
      )
      if (updatedKaryawan) {
        res.status(200).json({
          message: 'Karyawan updated successfully',
          karyawan: updatedKaryawan,
          status: 'success'
        })
      } else {
        res.status(404).json({
          error: 'Karyawan not found',
          karyawanId: req.params.id,
          status: 'failure'
        })
      }
    } catch (error) {
      res.status(500).json({
        error: 'Failed to update karyawan',
        details: (error as Error).message,
        status: 'error'
      })
    }
  },

  async deleteKaryawan(req: Request, res: Response) {
    const karyawanId = Number(req.params.id)

    try {
      const deleted = await karyawanService.deleteKaryawan(karyawanId)

      if (deleted) {
        res.status(200).json({
          message: 'Karyawan deleted successfully',
          karyawanId,
          status: 'success'
        })
      } else {
        res.status(404).json({
          error: 'Karyawan not found',
          karyawanId,
          status: 'failure'
        })
      }
    } catch (error) {
      console.error('Error in deleteKaryawan controller:', error)
      res.status(500).json({
        error: 'Failed to delete karyawan',
        details: (error as Error).message,
        karyawanId,
        status: 'error'
      })
    }
  }
}
