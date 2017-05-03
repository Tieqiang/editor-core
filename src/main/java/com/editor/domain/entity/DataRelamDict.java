package com.editor.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/5/3.
 */
@Entity
@Table(name = "data_relam_dict", schema = "editor", catalog = "")
public class DataRelamDict {
    private String id;
    private String dataRelamName;
    private String dataRelamDesc;

    @Id
    @Column(name = "id")
    @GenericGenerator(name="generator",strategy = "uuid.hex")
    @GeneratedValue(generator = "generator")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "data_relam_name")
    public String getDataRelamName() {
        return dataRelamName;
    }

    public void setDataRelamName(String dataRelamName) {
        this.dataRelamName = dataRelamName;
    }

    @Basic
    @Column(name = "data_relam_desc")
    public String getDataRelamDesc() {
        return dataRelamDesc;
    }

    public void setDataRelamDesc(String dataRelamDesc) {
        this.dataRelamDesc = dataRelamDesc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DataRelamDict that = (DataRelamDict) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (dataRelamName != null ? !dataRelamName.equals(that.dataRelamName) : that.dataRelamName != null)
            return false;
        if (dataRelamDesc != null ? !dataRelamDesc.equals(that.dataRelamDesc) : that.dataRelamDesc != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (dataRelamName != null ? dataRelamName.hashCode() : 0);
        result = 31 * result + (dataRelamDesc != null ? dataRelamDesc.hashCode() : 0);
        return result;
    }
}
