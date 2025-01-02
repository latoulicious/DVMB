import { Request, Response } from 'express'
import { karyawanService } from '../services/karyawanService'

export const karyawanController = {
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

  async getAllKaryawan(req: Request, res: Response) {
    try {
      const karyawanList = await karyawanService.getAllKaryawan()
      res.status(200).json({
        message: 'Karyawan fetched successfully',
        karyawanList,
        status: 'success'
      })
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
      res.status(500).json({
        error: 'Failed to delete karyawan',
        details: (error as Error).message,
        karyawanId,
        status: 'error'
      })
    }
  }
}
