import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

export interface JobAttributes {
    id: number,
    title: string,
    description: string;
    location: string;
    company: string;
    salary: number;
}

class Job extends Model<JobAttributes> implements JobAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public location!: string;
    public company!: string;
    public salary!: number;
}

Job.init(
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        company: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        salary: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'jobs',
      }
)

export default Job