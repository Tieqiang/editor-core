package com.editor.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/5/3.
 */
@Entity
@Table(name = "data_relam_detail", schema = "editor", catalog = "")
public class DataRelamDetail {
    private String id;
    private String dataRelamId;
    private String viewName;
    private String value;

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
    @Column(name = "view_name")
    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    @Basic
    @Column(name = "value")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DataRelamDetail that = (DataRelamDetail) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (dataRelamId != null ? !dataRelamId.equals(that.dataRelamId) : that.dataRelamId != null) return false;
        if (viewName != null ? !viewName.equals(that.viewName) : that.viewName != null) return false;
        if (value != null ? !value.equals(that.value) : that.value != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (dataRelamId != null ? dataRelamId.hashCode() : 0);
        result = 31 * result + (viewName != null ? viewName.hashCode() : 0);
        result = 31 * result + (value != null ? value.hashCode() : 0);
        return result;
    }
}
