package com.editor.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/4/26.
 */
@Entity
@Table(name = "template_dict", schema = "editor", catalog = "")
public class TemplateDict {
    private String id;
    private String templateName;
    private String templateGroupId;
    private Integer templateNo;
    private String templateContent;
    private String status;

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
    @Column(name = "template_name")
    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    @Basic
    @Column(name = "template_group_id")
    public String getTemplateGroupId() {
        return templateGroupId;
    }

    public void setTemplateGroupId(String templateGroupId) {
        this.templateGroupId = templateGroupId;
    }

    @Basic
    @Column(name = "template_no")
    public Integer getTemplateNo() {
        return templateNo;
    }

    public void setTemplateNo(Integer templateNo) {
        this.templateNo = templateNo;
    }

    @Basic
    @Column(name = "template_content")
    public String getTemplateContent() {
        return templateContent;
    }

    public void setTemplateContent(String templateContent) {
        this.templateContent = templateContent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TemplateDict that = (TemplateDict) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (templateName != null ? !templateName.equals(that.templateName) : that.templateName != null) return false;
        if (templateGroupId != null ? !templateGroupId.equals(that.templateGroupId) : that.templateGroupId != null)
            return false;
        if (templateNo != null ? !templateNo.equals(that.templateNo) : that.templateNo != null) return false;
        if (templateContent != null ? !templateContent.equals(that.templateContent) : that.templateContent != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (templateName != null ? templateName.hashCode() : 0);
        result = 31 * result + (templateGroupId != null ? templateGroupId.hashCode() : 0);
        result = 31 * result + (templateNo != null ? templateNo.hashCode() : 0);
        result = 31 * result + (templateContent != null ? templateContent.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
