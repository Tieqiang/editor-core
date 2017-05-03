package com.editor.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/5/3.
 */
@Entity
@Table(name = "element_data_vs_relam", schema = "editor", catalog = "")
public class ElementDataVsRelam {
    private String id;
    private String dataRelamId;
    private String dataElementId;

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
    @Column(name = "data_relam_id")
    public String getDataRelamId() {
        return dataRelamId;
    }

    public void setDataRelamId(String dataRelamId) {
        this.dataRelamId = dataRelamId;
    }

    @Basic
    @Column(name = "data_element_id")
    public String getDataElementId() {
        return dataElementId;
    }

    public void setDataElementId(String dataElementId) {
        this.dataElementId = dataElementId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ElementDataVsRelam that = (ElementDataVsRelam) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (dataRelamId != null ? !dataRelamId.equals(that.dataRelamId) : that.dataRelamId != null) return false;
        if (dataElementId != null ? !dataElementId.equals(that.dataElementId) : that.dataElementId != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (dataRelamId != null ? dataRelamId.hashCode() : 0);
        result = 31 * result + (dataElementId != null ? dataElementId.hashCode() : 0);
        return result;
    }
}
