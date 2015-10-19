package com.boki.batch;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.mysql.jdbc.Driver;

public class PreparedBatchTest {

	public static void main(String[] args) throws SQLException {

		new Driver();

		Connection conn = null;
		PreparedStatement preStmt = null;
		ResultSet rs = null;

		try {
			conn = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
					"root",  "Ie@119653");

			preStmt = conn.prepareStatement("insert into tb_person "
					+ " ( name, english_name, age, "
					+ " sex, birthday, description) "
					+ " values (?, ?, ?, ?, ?, ?) ");

			for (int i = 0; i < 5; i++) {

				int index = 1;

				preStmt.setString(index++, "Name " + i);
				preStmt.setString(index++, "English Name" + i);
				preStmt.setInt(index++, 25);
				preStmt.setString(index++, "man");
				preStmt.setDate(index++, new java.sql.Date(System
						.currentTimeMillis()));
				preStmt.setString(index++, "");

				// �W�[�P�@���a�Ѽƪ�SQL�ԭz
				preStmt.addBatch();
			}

			// �妸���� �N�C�ySQL���檺���G��´�� int[] �}�C
			int[] result = preStmt.executeBatch();

			// ��X
			System.out.print("�v�T����Ƥ��O���G");
			for (int i = 0; i < result.length; i++) {
				System.out.print(result[i] + ", ");
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
}
