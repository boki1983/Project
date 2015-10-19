package com.boki.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.boki.bean.Department;
import com.boki.util.DbManager;

public class DepartmentDAO {

	/**
	 * ���J�@�� Department �O��
	 * 
	 * @param department
	 * @throws Exception
	 */
	public static int insert(Department department) throws Exception {

		String sql = "INSERT INTO tb_department (name) VALUES ( ? ) ";

		return DbManager.executeUpdate(sql, department.getName());
	}

	/**
	 * �x�s Department
	 * 
	 * @param department
	 * @throws Exception
	 */
	public static int save(Department department) throws Exception {

		String sql = "UPDATE tb_department SET name = ? WHERE id = ? ";

		return DbManager.executeUpdate(sql, department.getName(), department
				.getId());
	}

	/**
	 * �R�� Department
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public static int delete(Integer id) throws Exception {

		String sql = "DELETE FROM tb_department WHERE id = ? ";

		return DbManager.executeUpdate(sql, id);

	}

	/**
	 * �M��@�� Department ���
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public static Department find(Integer id) throws Exception {

		String sql = "SELECT * FROM tb_department WHERE id = ? ";

		Connection conn = null;
		PreparedStatement preStmt = null;
		ResultSet rs = null;

		try {
			conn = DbManager.getConnection();
			//  �إ�prepareStatement
			preStmt = conn.prepareStatement(sql);
			//  �]�q�Ѽ�
			preStmt.setInt(1, id);
            //  �d�ߨ��^���G��
			rs = preStmt.executeQuery();

			if (rs.next()) {
				//  �ʸ˦�Department����
				Department department = new Department();
				department.setId(id);
				department.setName(rs.getString("name"));
				return department;
			} else {
				return null;
			}

		} finally {
			if (rs != null)
				rs.close();
			if (preStmt != null)
				preStmt.close();
			if (conn != null)
				conn.close();
		}
	}

	/**
	 * �C�X�Ҧ��� Department ���
	 * @return
	 * @throws Exception
	 */
	public static List<Department> listDepartments() throws Exception {

		List<Department> list = new ArrayList<Department>();
        //  �d�ߩҦ�tb_department�ê@���Ƨ�
		String sql = "SELECT * FROM tb_department ORDER BY id DESC ";

		Connection conn = null;
		PreparedStatement preStmt = null;
		ResultSet rs = null;

		try {
			conn = DbManager.getConnection();
			preStmt = conn.prepareStatement(sql);

			rs = preStmt.executeQuery();

			while (rs.next()) {
				//  �d�ߤ@�����s�JDepartment����
				Department department = new Department();
				department.setId(rs.getInt("id"));
				department.setName(rs.getString("name"));
                //  Department����s��list
				list.add(department);
			}

		} finally {
			if (rs != null)
				rs.close();
			if (preStmt != null)
				preStmt.close();
			if (conn != null)
				conn.close();
		}
		return list;
	}

}
